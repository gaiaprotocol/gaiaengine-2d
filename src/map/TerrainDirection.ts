enum TerrainDirection {
  // Single directions
  TopLeft = "top-left",
  Top = "top",
  TopRight = "top-right",
  Left = "left",
  Center = "center",
  Right = "right",
  BottomLeft = "bottom-left",
  Bottom = "bottom",
  BottomRight = "bottom-right",

  // Two-direction fills
  FillTopBottom = "fill-top-bottom",
  FillLeftRight = "fill-left-right",
  FillTopLeft = "fill-top-left",
  FillTopRight = "fill-top-right",
  FillBottomLeft = "fill-bottom-left",
  FillBottomRight = "fill-bottom-right",

  // Three-direction fills
  FillTopLeftRight = "fill-top-left-right",
  FillTopLeftBottom = "fill-top-left-bottom",
  FillTopRightBottom = "fill-top-right-bottom",
  FillBottomLeftRight = "fill-bottom-left-right",
  FillTopBottomLeft = "fill-top-bottom-left",
  FillTopBottomRight = "fill-top-bottom-right",

  // All directions filled
  FillFull = "fill-full",
}

export default TerrainDirection;
