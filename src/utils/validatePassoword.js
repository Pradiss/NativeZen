
// Função para validar se as senhas coincidem
export function validatePasswordConfirmation(getValues) {
  return (value) => {
    const password = (getValues && getValues("password")) || "";
    return value === password || "As senhas devem ser iguais.";
  };
}
