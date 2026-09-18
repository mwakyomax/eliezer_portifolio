import React from 'react';
import { Layers, Plus, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import { Service } from '../../../types';

interface ServicesTabProps {
  services: Service[];
  onOpenNewService: () => void;
  onEditService: (service: Service) => void;
  onDeleteService: (id: string) => void;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({
  services,
  onOpenNewService,
  onEditService,
  onDeleteService,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EAE3E5] shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-black text-[#18181B] tracking-tight">
              Services & Engineering Solutions
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3F5] text-[#761A30] font-black text-xs border border-[#F4ECEE]">
              {services.length} Offerings
            </span>
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Specify the technical services and consultation deliverables you provide to enterprise and client projects.
          </p>
        </div>

        <button
          onClick={onOpenNewService}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {services.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#EAE3E5] text-center space-y-3">
          <Layers className="w-10 h-10 mx-auto text-[#A1A1AA]" />
          <h3 className="text-base font-bold text-[#18181B]">No services configured</h3>
          <p className="text-xs text-[#71717A] max-w-sm mx-auto">
            Define the engineering solutions you offer.
          </p>
          <button
            onClick={onOpenNewService}
            className="px-4 py-2 rounded-full bg-[#761A30] text-white text-xs font-bold hover:bg-[#5E1426]"
          >
            Add Service
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const id = service._id || service.id;
            return (
              <div
                key={id}
                className="p-6 rounded-3xl bg-white border border-[#EAE3E5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center group-hover:bg-[#761A30] group-hover:text-white transition-colors">
                      <Layers className="w-5 h-5" />
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onEditService(service)}
                        className="p-1.5 rounded-lg bg-[#FAF3F5] text-[#761A30] hover:bg-[#761A30] hover:text-white transition-colors"
                        title="Edit Service"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteService(id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif font-black text-lg text-[#18181B]">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#52525B] leading-relaxed mt-1">
                      {service.description}
                    </p>
                  </div>

                  {Array.isArray(service.features) && service.features.length > 0 && (
                    <div className="pt-2 border-t border-[#F1EBEB] space-y-1.5">
                      {service.features.map((feat: string, i: number) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-[#52525B]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
