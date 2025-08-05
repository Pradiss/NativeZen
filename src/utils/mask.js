export const formatPhone = (value) => {
  if (typeof value !== "string") return "";
  const cleaned = value.replace(/\D/g, "").slice(0, 11);
  if (cleaned.length <= 2) return `(${cleaned}`;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  if (cleaned.length <= 10) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

export const cleanPhone = (value) => {
  if (!value) return ""; 
  return value.replace(/\D/g, "");
};

export const formatCPF = (value) =>
  value
    .replace(/\D/g, "") // só dígitos
    .replace(/(\d{3})(\d)/, "$1.$2") // 123.456
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3") // 123.456.789
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4") // 123.456.789-00
    .slice(0, 14);

export const formatCEP = (value = "") => {
  return value
    .replace(/\D/g, "")
    .slice(0, 8) // limita para 4 digitos
    .replace(/^(\d{5})(\d)/, "$1-$2"); // Insere o hífen entre o 5º e 6º digito
};

export const formatN = (value) => {
  return value
    .replace(/\D/g, "") // Remove tudo que nao for digito
    .slice(0, 4)
};

export const isEmailValid = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


export const formatUF = (value) =>
  value
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase() 
    .slice(0, 2);

export const formatMoney = (value) => {
   const numericValue = value.replace(/\D/g, ""); // Remove tudo que não é número

  const number = (Number(numericValue) / 100).toFixed(2); // Divide por 100 para centavos

return "R$ " + number
  .replace(".", ",")
  .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


export const formatReais = (value) => {
  // Converte para número (caso seja string)
  const number = Number(value) || 0;
  
  // Formata como moeda brasileira
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });
};
