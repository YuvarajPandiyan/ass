import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import {
  initialValues,
  validationSchemes,
} from "@lib/formValidation/modalForm";
import { Persist } from "formik-persist";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type Props = {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  isOpenModal: boolean;
};

export const FormModal = ({ isOpenModal, setIsOpenModal }: Props) => {
  const nameRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (isOpenModal) {
      nameRef.current?.focus();
    }
  }, [isOpenModal]);

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-300 bg-opacity-40">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemes}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            resetForm();
            localStorage.removeItem("task-one");
          }, 400);
          setTimeout(() => {
            localStorage.removeItem("task-one"), console.log("cleared");
          }, 3000);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="bg-white p-10 rounded-3xl w-[30rem]">
              <div className="flex justify-between">
                <h2 className="font-extrabold text-3xl">Task One</h2>
                <p
                  className="text-2xl text-gray-700 cursor-pointer"
                  onClick={() => setIsOpenModal(false)}
                >
                  x
                </p>
              </div>

              <div className="my-4">
                <label htmlFor="name" className="font-medium text-gray-900">
                  Name
                </label>
                <br />
                <Field
                  innerRef={nameRef}
                  type="text"
                  name="name"
                  className="w-full rounded-md py-3 mt-2 border-2 focus:ring-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="my-4">
                <label htmlFor="email" className="font-medium text-gray-900">
                  Email
                </label>
                <br />
                <Field
                  type="email"
                  name="email"
                  className="w-full rounded-md py-3 mt-2 border-2 focus:ring-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="my-4">
                <label htmlFor="phone" className="font-medium text-gray-900">
                  Phone
                </label>
                <br />
                <Field
                  type="phone"
                  name="phone"
                  className="w-full rounded-md py-3 mt-2 border-2 focus:ring-2"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="my-4">
                <label htmlFor="linkedIn" className="font-medium text-gray-900">
                  LinkedIn
                </label>
                <br />
                <Field
                  type="text"
                  name="linkedIn"
                  className="w-full rounded-md py-3 mt-2 border-2 focus:ring-2"
                />
                <ErrorMessage
                  name="linkedIn"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <button
                className="btn btn-red-800"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
            <Persist name="task-one" />
          </Form>
        )}
      </Formik>
    </div>
  );
};
