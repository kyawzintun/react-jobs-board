import ClickLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};
const Spinner = ({ loading }: { loading: boolean }) => {
  return (
    <ClickLoader
      data-testid="spinner"
      color="#4338ca"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default Spinner;
