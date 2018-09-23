const attributes = ['name', 'defaultValue' /* 'required', 'unique' */];

export default {
  string: {
    icon: 'font',
    color: '#ffb500',
    attributes: [...attributes /* , 'range' */],
  },
  text: {
    icon: 'align-left',
    color: '#ff9200',
    attributes: [...attributes, 'editor'],
  },
  number: {
    icon: 'hashtag',
    color: '#e8442f',
    attributes: [...attributes, 'range', 'numberFormat'],
  },
  media: {
    icon: 'image',
    color: '#b981d5',
    attributes: [...attributes, 'multiple'],
  },
  date: {
    icon: 'calendar',
    color: '#1c8ee2',
    attributes,
  },
  email: {
    icon: 'at',
    color: '#3c8c98',
    attributes,
  },
  bool: {
    icon: 'check-square',
    color: '#69ba05',
    attributes,
  },
};
