import DataLoader from 'dataloader';

export const makeUserDataLoader = (getUsers) => {
  return new DataLoader(async (ids: string[]) => {
    const urlQuery = ids.join('&id=');
    const users = await getUsers('?id=' + urlQuery);
    return ids.map((id: string) => users.find((user) => user.id === id));
  });
};
