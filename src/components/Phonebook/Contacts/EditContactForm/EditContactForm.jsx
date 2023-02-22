import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoIosCall, IoMdPerson, IoMdPersonAdd } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { useEditContactMutation } from 'redux/contactsSlice';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { RiSave3Fill } from 'react-icons/ri';

import {
  PhonebookForm as Form,
  Input,
  Label,
  Error,
} from './EditContactForm.styled';
import Box from 'components/shared/Box';
import Button from 'components/shared/Button';
import theme from 'theme';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  lastName: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!'),
  tel: Yup.string()
    .matches(phoneRegExp, 'Number is not valid')
    .required('Required'),
  email: Yup.string().email('example: mail@mail.com'),
});

const EditContactForm = ({ data, toggleModal }) => {
  const [editContact, { isLoading }] = useEditContactMutation();

  const { id, firstname, lastname, phone, email, createdAt } = data;

  return (
    <Formik
      initialValues={{
        id,
        firstName: firstname,
        lastName: lastname,
        tel: phone,
        email,
        createdAt,
      }}
      validationSchema={ValidationSchema}
      onSubmit={({ firstName, lastName, tel, email }) => {
        const contact = {
          id,
          firstname: firstName,
          lastname: lastName,
          phone: tel,
          email,
          createdAt,
        };

        editContact(contact);
        Notify.warning('Contact successfully changed');
        toggleModal();
      }}
    >
      <Form>
        <Box mb={theme.space[4]}>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Label htmlFor="firstName">First Name</Label>
            <Box display="flex" alignItems="center" mb={theme.space[5]}>
              <IoMdPerson size={34} color={theme.colors.accent} />
              <Box position="relative">
                <Input id="firstName" name="firstName" placeholder="Name" />
                <ErrorMessage name="firstName" component={Error} />
              </Box>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Label htmlFor="lastName">Last Name</Label>
            <Box display="flex" alignItems="center" mb={theme.space[5]}>
              <IoMdPerson size={34} color={theme.colors.accent} />
              <Box position="relative">
                <Input id="lastName" name="lastName" placeholder="Last name" />
                <ErrorMessage name="lastName" component={Error} />
              </Box>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Label htmlFor="tel">Phone</Label>
            <Box display="flex" alignItems="center" mb={theme.space[5]}>
              <IoIosCall size={34} color={theme.colors.accent} />
              <Box position="relative">
                <Input
                  id="tel"
                  name="tel"
                  placeholder="000000000000"
                  type="tel"
                />
                <ErrorMessage name="tel" component={Error} />
              </Box>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Label htmlFor="email">E-mail</Label>
            <Box display="flex" alignItems="center" mb={theme.space[5]}>
              <MdEmail size={34} color={theme.colors.accent} />
              <Box position="relative">
                <Input
                  id="email"
                  name="email"
                  placeholder="mail@mail.com"
                  type="email"
                />
                <ErrorMessage name="email" component={Error} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Button
          type="submit"
          isLoading={isLoading}
          icon={RiSave3Fill}
          disabled={isLoading ? true : false}
          children="Save"
          iconSize={20}
        />
      </Form>
    </Formik>
  );
};

export default EditContactForm;
