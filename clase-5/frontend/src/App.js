import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const PRODUCTS_QUERY = gql`
  query ListProductQuery {
    ListProducts {
      name
      id
    }
  }
`;

const MUTATION = gql`
  mutation CreateProductMutation($name: String!) {
    CreateProduct(name: $name) {
      name,
      id
    }
  }
`;

function App() {
  const [ value, setValue ] = React.useState('');
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);
  const [ createProduct, status ] = useMutation(MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }, 'ListProductQuery']
  });

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return 'Hubo un error :(';
  }

  const handleCreateProduct = () => {
    createProduct({
      variables: {
        name: value
      }
    })
  }

  return (
    <div className="App">
      <ul>
        {data.ListProducts.map((product, key) => (
          <li key={`product-${key}`}>{product.name} #{product.id}</li>
        ))}
      </ul>

      <input type="text" onChange={(event) => setValue(event.target.value)} />
      <button onClick={handleCreateProduct}>Crear producto</button>
    </div>
  );
}

export default App;
