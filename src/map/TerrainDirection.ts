enum TerrainDirection {
  // Single directions
  TopLeft = "top-left",
  Top = "top",
  TopRight = "top-right",
  Right = "right",
  BottomRight = "bottom-right",
  Bottom = "bottom",
  BottomLeft = "bottom-left",
  Left = "left",

  // Two-direction fills
  FillTopBottom = "fill-top-bottom",
  FillLeftRight = "fill-left-right",
  FillTopLeft = "fill-top-left",
  FillTopRight = "fill-top-right",
  FillBottomRight = "fill-bottom-right",
  FillBottomLeft = "fill-bottom-left",

  // Three-direction fills
  FillTopLeftRight = "fill-top-left-right",
  FillTopRightBottom = "fill-top-right-bottom",
  FillBottomLeftRight = "fill-bottom-left-right",
  FillTopLeftBottom = "fill-top-left-bottom",

  // All directions filled
  FillFull = "fill-full",
}

export default TerrainDirection;
