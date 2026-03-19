import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  ArrowUpDown, 
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface CRMField {
  id: string;
  name: string;
  type: 'text' | 'date' | 'number' | 'select';
  required: boolean;
  readOnly: boolean;
  order: number;
  defaultValue: string;
  validation: string;
  created: string;
  updated: string;
}

const INITIAL_FIELDS: CRMField[] = [
  { 
    id: '1', 
    name: 'Número Documento', 
    type: 'text', 
    required: false, 
    readOnly: true, 
    order: 1, 
    defaultValue: '', 
    validation: 'false', 
    created: '11/06/2025 15:11', 
    updated: '12/06/2025 08:24' 
  },
  { 
    id: '2', 
    name: 'Código Cliente único', 
    type: 'text', 
    required: false, 
    readOnly: true, 
    order: 2, 
    defaultValue: '', 
    validation: 'false', 
    created: '11/06/2025 15:10', 
    updated: '12/06/2025 08:24' 
  },
  { 
    id: '3', 
    name: 'Fecha próxima llamada', 
    type: 'date', 
    required: false, 
    readOnly: false, 
    order: 3, 
    defaultValue: '', 
    validation: 'false', 
    created: '15/07/2025 13:52', 
    updated: '15/07/2025 13:52' 
  },
];

export const CRMFieldsView: React.FC = () => {
  const { t } = useTranslation();
  const [fields, setFields] = useState<CRMField[]>(INITIAL_FIELDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<CRMField | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<CRMField>>({
    name: '',
    type: 'text',
    required: false,
    readOnly: false,
    order: 1,
    defaultValue: '',
    validation: 'false'
  });

  const filteredFields = useMemo(() => {
    return fields.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [fields, searchTerm]);

  const handleOpenModal = (field?: CRMField) => {
    if (field) {
      setEditingField(field);
      setFormData(field);
    } else {
      setEditingField(null);
      setFormData({
        name: '',
        type: 'text',
        required: false,
        readOnly: false,
        order: fields.length + 1,
        defaultValue: '',
        validation: 'false'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name) return;

    const now = new Date().toLocaleString();
    
    if (editingField) {
      setFields(prev => prev.map(f => f.id === editingField.id ? { 
        ...f, 
        ...formData, 
        updated: now 
      } as CRMField : f));
    } else {
      const newField: CRMField = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        created: now,
        updated: now
      } as CRMField;
      setFields(prev => [...prev, newField]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t('crm.delete_confirm'))) {
      setFields(prev => prev.filter(f => f.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('crm.title')}</h1>
          <p className="text-slate-500 text-sm">Configure custom fields for your CRM records.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {t('crm.add')}
        </button>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="max-w-md space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('crm.name')}</label>
          <div className="relative">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
              placeholder="Filter by name..." 
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-24">Actions</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 transition-colors">
                    {t('crm.name')}
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('crm.type')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">{t('crm.required')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">{t('crm.readonly')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">{t('crm.order')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('crm.default_value')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('crm.validation')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('crm.created')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('crm.updated')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredFields.map((field) => (
                <tr key={field.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleOpenModal(field)}
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(field.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{field.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 capitalize">{field.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center">
                      {field.required ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-slate-300" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center">
                      {field.readOnly ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-slate-300" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-center">{field.order}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{field.defaultValue || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{field.validation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 font-mono text-xs">{field.created}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 font-mono text-xs">{field.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 text-sm text-slate-500">
          Mostrando de 1 a {filteredFields.length} / Total: {fields.length}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingField ? 'Edit CRM Field' : 'Add New CRM Field'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('crm.name')}</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                      placeholder="Field name (e.g. Client ID)"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('crm.type')}</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                    >
                      <option value="text">{t('crm.type_text')}</option>
                      <option value="date">{t('crm.type_date')}</option>
                      <option value="number">{t('crm.type_number')}</option>
                      <option value="select">{t('crm.type_select')}</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('crm.order')}</label>
                    <input 
                      type="number" 
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={formData.required}
                      onChange={(e) => setFormData(prev => ({ ...prev, required: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500" 
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{t('crm.required')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={formData.readOnly}
                      onChange={(e) => setFormData(prev => ({ ...prev, readOnly: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500" 
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{t('crm.readonly')}</span>
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('crm.default_value')}</label>
                  <input 
                    type="text" 
                    value={formData.defaultValue}
                    onChange={(e) => setFormData(prev => ({ ...prev, defaultValue: e.target.value }))}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                  />
                </div>

                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Changes to CRM fields are applied immediately to all active cases. Ensure field types match your data requirements.
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                >
                  {t('crm.cancel')}
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
                >
                  {t('crm.save')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CRMFieldsView;
