export function MaskNumber() {
  return {
    mask: (value: string) => {
      return value.replace(/\D/g, "");
    },
    unmask: (value: string) => {
      return value;
    },
  };
}
