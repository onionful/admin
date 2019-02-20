const media = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

const min = (value: number) => `@media (min-width: ${value}px)`;

export default {
  ...media,
  query: {
    smAndUp: min(media.sm),
    mdAndUp: min(media.md),
    lgAndUp: min(media.lg),
    xlAndUp: min(media.xl),
    xxlAndUp: min(media.xxl),
  },
};
