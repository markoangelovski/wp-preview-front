const Accordion = ({ payload }) => {
  return (
    <div className="container mx-auto mt-1">
      <div className="rounded overflow-hidden">
        <div className="group outline-none accordion-section" tabIndex="1">
          <div className="group bg-gray-900 flex justify-between  items-center text-gray-500 transition ease duration-500 cursor-pointer  relative">
            <div
              className="group-focus:text-white transition ease duration-500 p-1"
              title="Click outside to close me."
            >
              Raw payload from WP (click outside to close)
            </div>
            <div className="h-8 w-8 items-center inline-flex justify-center transform transition ease duration-500 group-focus:text-white group-focus:-rotate-180 absolute top-0 right-0 mb-auto ml-auto mr-2">
              &#x25BC;
            </div>
          </div>
          <div className="group-focus:max-h-screen max-h-0 bg-gray-800 px-4 overflow-auto ease duration-500">
            <div className="p-2 text-gray-400 text-justify">
              <code>
                <pre>{JSON.stringify(payload, null, 2)}</pre>
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
