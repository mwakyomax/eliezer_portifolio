import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message.js';
import { memoryStore } from '../data/store.js';

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newMessageData = {
      name,
      email,
      subject,
      message,
      isRead: false,
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      const created = await Message.create(newMessageData);
      return res.status(201).json({ 
        success: true, 
        message: 'Thank you! Your message has been sent successfully.', 
        data: created 
      });
    }

    const newMsg = { _id: 'msg_' + Date.now(), ...newMessageData };
    memoryStore.messages.unshift(newMsg);

    return res.status(201).json({ 
      success: true, 
      message: 'Thank you! Your message has been sent successfully.', 
      data: newMsg 
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await Message.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: messages.length, data: messages });
    }
    return res.json({ success: true, count: memoryStore.messages.length, data: memoryStore.messages });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleReadStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        const updated = await Message.findByIdAndUpdate(id, { isRead }, { new: true });
        if (updated) return res.json({ success: true, data: updated, message: 'Message status updated' });
      }
    }

    const idx = memoryStore.messages.findIndex(m => m._id === id || m.id === id);
    if (idx !== -1) {
      memoryStore.messages[idx].isRead = typeof isRead === 'boolean' ? isRead : !memoryStore.messages[idx].isRead;
      return res.json({ success: true, data: memoryStore.messages[idx], message: 'Message status updated' });
    }

    return res.status(404).json({ success: false, message: 'Message not found' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        await Message.findByIdAndDelete(id);
      }
    }
    memoryStore.messages = memoryStore.messages.filter(m => m._id !== id && m.id !== id);
    return res.json({ success: true, message: 'Message deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
