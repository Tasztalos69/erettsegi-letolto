const PickerButton = (props: any) => {
  return (
    <button
      type="button"
      className="px-8 py-3 m-2 font-mono text-lg font-medium transition-all duration-100 border-2 border-gray-900 rounded dark:border-gray-50 xl:hover:scale-105 xl:hover:shadow-lg xl:hover:shadow-teal-300/50 first-letter:uppercase"
      {...props}
    />
  );
};

export default PickerButton;
