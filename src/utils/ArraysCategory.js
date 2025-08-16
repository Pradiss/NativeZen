export const categoriaOptions = 
[
{ label: "Samba", value: "1" },
  { label: "Sertanejo", value: "2" },
  { label: "Rock", value: "3" },
  { label: "Pagode", value: "4" },
  { label: "MPB", value: "5" },
  { label: "Gospel", value: "7" },
  { label: "Reggae", value: "8" },
  { label: "Blues", value: "9" },
  { label: "Jazz", value: "10" },
  { label: "Música Erudita", value: "11" }
];

export const instrumentoOptions = 
[
  { label: "Violão", value: "1" },
  { label: "Bateria", value: "2" },
  { label: "Cavaco", value: "3" },
  { label: "Cantor(a)", value: "4" },
  { label: "Contrabaixo", value: "5" },
  { label: "Piano", value: "6" },
  { label: "Guitarra", value: "7" },
  { label: "Violino", value: "8" },
  { label: "Saxofone", value: "9" },
  { label: "Teclado", value: "10" },
  { label: "Flauta", value: "11" },
  { label: "Tambor", value: "12" },
  { label: "Bandolim", value: "13" },
  { label: "Trompete", value: "14" },

];

export const getCategoriaLabel = (value) => {
  const item = categoriaOptions.find((obj) => obj.value === value)
  return item ? item.label : ''
}

export const getInstrumentoLabel = (value) => {
  const item = instrumentoOptions.find((obj) => obj.value === value)
  return item ? item.label : ''
};
