export const categoriaOptions = 
[
  { label: "Samba", value: "1" },
  { label: "Sertanejo", value: "2" },
  { label: "Rock", value: "3" },
  { label: "Pagode", value: "4" },
  { label: "MPB", value: "5" },
  { label: "DJ", value: "6" },
]

export const instrumentoOptions = 
[
  { label: "Violão", value: "1" },
  { label: "Bateria", value: "2" },
  { label: "Cavaco", value: "3" },
  { label: "Cantor(a)", value: "4" },
  { label: "Baixo", value: "5" },
]

export const getCategoriaLabel = (value) => {
  const item = categoriaOptions.find((obj) => obj.value === value)
  return item ? item.label : ''
}

export const getInstrumentoLabel = (value) => {
  const item = instrumentoOptions.find((obj) => obj.value === value)
  return item ? item.label : ''
};
