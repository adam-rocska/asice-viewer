const byteFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});

export default byteFormatter;