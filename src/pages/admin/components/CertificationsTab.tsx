import React from 'react';
import { Award, Plus, Edit, Trash2, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { Certification } from '../../../types';

interface CertificationsTabProps {
  certifications: Certification[];
  onOpenNewCertification: () => void;
  onEditCertification: (cert: Certification) => void;
  onDeleteCertification: (id: string) => void;
}

export const CertificationsTab: React.FC<CertificationsTabProps> = ({
  certifications,
  onOpenNewCertification,
  onEditCertification,
  onDeleteCertification,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EAE3E5] shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-black text-[#18181B] tracking-tight">
              Certifications & Credentials
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3F5] text-[#761A30] font-black text-xs border border-[#F4ECEE]">
              {certifications.length} Verified
            </span>
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Display your industry credentials (Cisco, AWS, Google, Oracle) with verification links and seal badges.
          </p>
        </div>

        <button
          onClick={onOpenNewCertification}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#EAE3E5] text-center space-y-3">
          <Award className="w-10 h-10 mx-auto text-[#A1A1AA]" />
          <h3 className="text-base font-bold text-[#18181B]">No certifications listed</h3>
          <p className="text-xs text-[#71717A] max-w-sm mx-auto">
            Add your Cisco, cloud, or programming credentials.
          </p>
          <button
            onClick={onOpenNewCertification}
            className="px-4 py-2 rounded-full bg-[#761A30] text-white text-xs font-bold hover:bg-[#5E1426]"
          >
            Add Certification
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => {
            const id = cert._id || cert.id;
            return (
              <div
                key={id}
                className="p-6 rounded-3xl bg-white border border-[#EAE3E5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt="Badge"
                        className="w-12 h-12 rounded-2xl object-cover border border-black/10 shadow-2xs"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center">
                        <Award className="w-6 h-6" />
                      </div>
                    )}

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onEditCertification(cert)}
                        className="p-1.5 rounded-lg bg-[#FAF3F5] text-[#761A30] hover:bg-[#761A30] hover:text-white transition-colors"
                        title="Edit Certification"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteCertification(id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Delete Certification"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif font-black text-base text-[#18181B] group-hover:text-[#761A30] transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-xs font-bold text-[#761A30] mt-0.5">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F1EBEB] flex items-center justify-between text-xs">
                  <span className="text-[#71717A] text-[11px]">
                    Issued: {cert.issueDate}
                  </span>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 text-[#761A30] font-bold text-xs hover:underline"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
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
