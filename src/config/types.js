const common = ['name' /* 'required', 'unique' */];

export default {
  identifier: {
    icon: 'globe',
    color: '#474747',
    attributes: ['fieldRef'],
    singleton: true,
  },
  string: {
    icon: 'font',
    color: '#ffb500',
    attributes: [...common, 'multiline'],
  },
  text: {
    icon: 'align-left',
    color: '#ff9200',
    attributes: [...common],
  },
  number: {
    icon: 'hashtag',
    color: '#e8442f',
    attributes: [...common, 'range', 'numberFormat'],
  },
  media: {
    icon: 'image',
    color: '#b981d5',
    attributes: [...common, 'multiple'],
  },
  date: {
    icon: 'calendar',
    color: '#1c8ee2',
    attributes: common,
  },
  email: {
    icon: 'at',
    color: '#3c8c98',
    attributes: common,
  },
  bool: {
    icon: 'check-square',
    color: '#69ba05',
    attributes: common,
  },
};
