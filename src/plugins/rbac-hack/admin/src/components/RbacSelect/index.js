import React, {useState} from 'react';
import { Select, Option } from '@strapi/design-system/Select';
import {Stack,Typography} from '@strapi/design-system'
import { Field, FieldInput } from '@strapi/design-system/Field';
import { Button } from '@strapi/design-system/Button';

const RbacSelect = () => {
    const myStyle = {
        stack:{
            width: "35%",
            textAlign: "center",
            margin: "0 auto",
        },
        
        
      };
    const [value, setValue] = useState();
    const [name, setName] = useState()
//   const [error, toggleError] = useState();
//   const [disabled, toggleDisabled] = useState();
  return (

        <Stack spacing={4} style={myStyle.stack}>
          {/* <Typography variant="beta">Current value is {value}</Typography> */}
          <Field name="roleName">
            <FieldInput type="text" placeholder="Enter name" value={name} onChange={() => {setName}} />
          </Field>
          <Select id="select1" style={myStyle} aria-label="Choose your role" placeholder="Select Role" onClear={() => setValue(undefined)} clearLabel="Clear the role" value={value} onChange={setValue}   >
            <Option value={'strapi-editor'}>Editor</Option>
            <Option value={'strapi-author'}>Author</Option>
          </Select>
          <Button  onClick ={()=>{}}>Submit</Button>
          {/* <button onClick={() => toggleError(s => s ? undefined : 'An error occured')}>
            <Typography>Show the error state</Typography>
          </button> */}
    
        </Stack>
  )
}

export default RbacSelect;