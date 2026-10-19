export const normalizePhone = (v) => v.replace(/[\s-]/g, '').replace(/^(\+?91|0)(?=\d{10}$)/, '');
export const validPhone = (v) => /^[6-9]\d{9}$/.test(normalizePhone(v || ''));
