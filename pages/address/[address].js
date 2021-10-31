import Address from '../../views/Address/Address';
const axios = require('axios');
import { ADDRESSES } from '../../constants/API/v0/routes';

export default function AddressPage(props) {
  return (
    <Address {...props} />
  )
}

// we can add server side rendering here to seperate from views
export async function getServerSideProps(req) {
    const { address } = req.query 
  async function getAddressInfo() {
    try {
      const response = await axios.get(`https://cardano-testnet.blockfrost.io/api/v0/addresses/${address}`, {
        headers: {
          'project_id': 'testnetUPmvF7J3QegmOt7tbOpzSVrduuhiDIm5'
        }});
      return response.data;
    } catch (error) {
      console.error(error.response);
      return null
    }
  }
  const addressInfo = await getAddressInfo();
      return {
          props: {
              addressInfo: addressInfo,
          }
      };
};
