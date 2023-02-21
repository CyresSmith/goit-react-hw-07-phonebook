import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCall, IoMdPerson, IoMdPersonAdd } from 'react-icons/io';

import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

import { PhonebookForm as Form, Input, Label, Error } from './Form.styled';
import Box from 'components/shared/Box';
import Button from 'components/shared/Button';
import theme from 'theme';
import { Notify } from 'notiflix';

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
});

const AddContactForm = () => {
  const dispatch = useDispatch();

  const { myContacts, isLoading, error } = useSelector(getContacts);

  const handleContactAdd = contact => {
    const { name } = contact;
    const normalizedName = name.toLowerCase();

    const dublicate = myContacts.find(
      ({ name }) => name.toLowerCase().trim() === normalizedName
    );

    if (dublicate) {
      Notify.failure(`${name} already in contacts`, {
        showOnlyTheLastOne: true,
        position: 'right-bottom',
      });
    } else {
      dispatch(addContact(contact));
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        tel: '',
      }}
      validationSchema={ValidationSchema}
      onSubmit={({ firstName, lastName, tel }, { resetForm }) => {
        const name = (firstName, lastName) => {
          if (lastName) {
            return firstName.trim() + ' ' + lastName.trim();
          }
          return firstName.trim();
        };

        const contact = {
          id: nanoid(),
          createdAt: new Date().toISOString(),
          name: name(firstName, lastName),
          phone: tel.trim(),
        };

        handleContactAdd(contact);
        resetForm();
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
        </Box>

        <Button
          type="submit"
          isLoading={isLoading}
          icon={IoMdPersonAdd}
          disabled={isLoading ? true : false}
          children="Add contact"
          iconSize={20}
        />
      </Form>
    </Formik>
  );
};

export default AddContactForm;
