export default function SignUpModalContainer() {
  const { closeModal, openModal } = useContext(ModalContext);
  // Registration is disabled, show modal with disabled form
  return (
    <SignupModal
      handleCloseModal={closeModal}
      handleOpenModal={openModal}
      handleSignup={(e) => {
        e.preventDefault();
      }}
      handleFormDataChange={() => {}}
      checkOtpValid={() => {}}
      isVerifiedEmail={false}
      sendVerificationEmailHandler={() => {}}
      error={"Registration is currently disabled."}
      formData={{ name: "", email: "", password: "" }}
      isValidEmail={false}
      showOtpInputFormField={false}
    />
  );
}
