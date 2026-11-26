export const APP_LOGO_SIZE = 240;
export const APP_LOGO_CORNER = 50;

// The face of the PurpleBot mark: two upright pill eyes and a short mouth line.
// Each shape is a polyline that is drawn with round line caps.
export const APP_LOGO_EYE_POINTS = {
  left: "83.7 84.4 83.7 125.6",
  right: "156.3 84.4 156.3 125.6",
} as const;
export const APP_LOGO_MOUTH_POINTS = "102.4 162.7 137.6 162.7";
export const APP_LOGO_EYE_STROKE = 34;
export const APP_LOGO_MOUTH_STROKE = 18.3;

/** The shapes of the face in drawing order, with the stroke width of each. */
export const APP_LOGO_FACE = [
  { name: "eye-left", points: APP_LOGO_EYE_POINTS.left, stroke: APP_LOGO_EYE_STROKE },
  { name: "eye-right", points: APP_LOGO_EYE_POINTS.right, stroke: APP_LOGO_EYE_STROKE },
  { name: "mouth", points: APP_LOGO_MOUTH_POINTS, stroke: APP_LOGO_MOUTH_STROKE },
] as const;
