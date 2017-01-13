
//i want you to fix this class at some point

function FieldGroup({ id, label, help=null, props }) {

/*fucniton FielGroup(Obj a )
    where a = {

    id:id,
    label:label,
    help:help,
    prop

    }

*/
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const LoginEmailPass = (

    <FieldGroup
      id="formControlsText"
      type="text"
      label="Text"
      placeholder="Enter text"
    />
    <FieldGroup
      id="formControlsEmail"
      type="email"
      label="Email address"
      placeholder="Enter email"
    />
    <FieldGroup
      id="formControlsPassword"
      label="Password"
      type="password"
    />

    <Button type="submit">
      Submit
    </Button>


)
export default FieldGroup
export default LoginEmailPass;
