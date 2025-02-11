import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

// Define an interface for the search props with a generic type
interface UseSearchProps<T> {
  data: T[];
  onSearch: (filteredData: T[]) => void; // Function to handle search
  searchKeys: (keyof T)[]; // Array of keys to search through
}

const UseSearch = <T extends {}>({ data, onSearch, searchKeys }: UseSearchProps<T>) => {
  const [searchVal, setSearchVal] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  // Trigger search whenever searchVal or data changes
  useEffect(() => {
    if (Array.isArray(data)) {
      const filteredData: T[] = data.filter((item) => {
        return searchKeys.some((key) => {
          const value = item[key];
          return typeof value === 'string' && value.toLowerCase().includes(searchVal.toLowerCase());
        });
      });
      onSearch(filteredData); // Send the filtered data to the parent
    }
  }, [searchVal, data, onSearch]);

  return (
    <Form>
      <Form.Group controlId="formSearch">
        <Form.Control
          type="search"
          style={{ width: "40%" }}
          value={searchVal}
          className={`form-control`}
          placeholder="Search..."
          onChange={handleInput}
        />
      </Form.Group>
    </Form>
  );
};

export default UseSearch;
