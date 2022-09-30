export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const fetching = () => {
    setIsLoading(true)
    callback
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setIsLoading(false)
      })
  };
  return [fetching, isLoading]
};
