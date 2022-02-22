const PickerButton = (props: any) => {
  return (
    <button
      className="px-8 py-3 m-2 text-lg font-medium font-mono rounded border-2 border-gray-900 hover:scale-105 hover:shadow-lg hover:shadow-teal-300/60 transition-all duration-100 first-letter:uppercase"
      {...props}
    ></button>
  );
};

export default PickerButton;
