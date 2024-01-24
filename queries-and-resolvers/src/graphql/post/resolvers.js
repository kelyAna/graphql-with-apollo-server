const post = () => {
  return {
    id: '1',
    title: 'Colação de grau 1',
  };
};

const posts = () => {
  return [
    {
      id: '1',
      title: 'Colação de grau 1',
    },
    {
      id: '2',
      title: 'Colação de grau 2',
    },
    {
      id: '3',
      title: 'Colação de grau 3',
    },
  ];
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
};
