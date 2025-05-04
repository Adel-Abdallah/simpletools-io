import React, { useState } from 'react';

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    render: ({ name, job, company, phone, email, website }) => (
      `<div style="font-family:sans-serif;">
        <div style="font-size:18px;font-weight:bold;">${name || 'Your Name'}</div>
        <div style="color:#555;">${job || 'Job Title'} at ${company || 'Company'}</div>
        <div style="margin-top:8px;">
          <span>📞 ${phone || 'Phone'}</span> | 
          <span>✉️ ${email || 'Email'}</span> | 
          <span>🌐 ${website || 'Website'}</span>
        </div>
      </div>`
    )
  },
  {
    id: 'modern',
    name: 'Modern',
    render: ({ name, job, company, phone, email, website }) => (
      `<div style="font-family:Arial,sans-serif;border-left:4px solid #2563eb;padding-left:12px;">
        <div style="font-size:20px;color:#2563eb;font-weight:bold;">${name || 'Your Name'}</div>
        <div style="font-size:14px;">${job || 'Job Title'} | ${company || 'Company'}</div>
        <div style="margin-top:6px;font-size:13px;">
          <span style="margin-right:10px;">${phone || 'Phone'}</span>
          <span style="margin-right:10px;">${email || 'Email'}</span>
          <span>${website || 'Website'}</span>
        </div>
      </div>`
    )
  },
  {
    id: 'minimal',
    name: 'Minimal',
    render: ({ name, job, company, phone, email, website }) => (
      `<div style="font-family:monospace;font-size:15px;">
        <div>${name || 'Your Name'} | ${job || 'Job Title'}</div>
        <div>${company || 'Company'}</div>
        <div>${phone || 'Phone'} | ${email || 'Email'} | ${website || 'Website'}</div>
      </div>`
    )
  }
];

const EmailSignatureGenerator = () => {
  const [form, setForm] = useState({
    name: '',
    job: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    template: 'classic',
    image: ''
  });

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm(f => ({ ...f, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedTemplate = templates.find(t => t.id === form.template);
  // Inject image into the template if present
  const html = selectedTemplate.render(form) + (form.image ? `<div style="margin-top:10px;"><img src="${form.image}" alt="Profile" style="max-width:120px;max-height:120px;border-radius:8px;" /></div>` : '');

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <div className="flex-1 flex flex-col">
        <label className="mb-2 font-semibold text-lg">Signature Details</label>
        <input className="mb-2 p-2 border rounded bg-white dark:bg-gray-900 dark:text-white" placeholder="Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
        <input className="mb-2 p-2 border rounded bg-white dark:bg-gray-900 dark:text-white" placeholder="Job Title" value={form.job} onChange={e => setForm(f => ({...f, job: e.target.value}))} />
        <input className="mb-2 p-2 border rounded bg-white dark:bg-gray-900 dark:text-white" placeholder="Company" value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))} />
        <input className="mb-2 p-2 border rounded bg-white dark:bg-gray-900 dark:text-white" placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
        <input className="mb-2 p-2 border rounded bg-white dark:bg-gray-900 dark:text-white" placeholder="Email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
        <input className="mb-2 p-2 border rounded bg-white dark:bg-gray-900 dark:text-white" placeholder="Website" value={form.website} onChange={e => setForm(f => ({...f, website: e.target.value}))} />
        <div className="mb-2">
          <label className="font-semibold mr-2">Template:</label>
          <select className="p-2 border rounded bg-white dark:bg-gray-900 dark:text-white" value={form.template} onChange={e => setForm(f => ({...f, template: e.target.value}))}>
            {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div className="mb-2">
          <label className="font-semibold mr-2">Photo/Logo:</label>
          <input type="file" accept="image/*" className="dark:text-white" onChange={handleImageUpload} />
        </div>
        <div className="flex gap-2 mt-2">
          <button className="px-3 py-1 border rounded bg-blue-500 text-white" disabled>Copy HTML</button>
        </div>
      </div>
      <div className="flex-1">
        <label className="mb-2 font-semibold text-lg">Live Preview</label>
        <div 
          className="w-full h-64 p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:text-white overflow-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

export default EmailSignatureGenerator; 