export default function Test() {
  return (
    <div>
      <div class="grid grid-cols-2 gap-4">
        <p>Staging</p>
        <p>Production</p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="block rounded-lg  py-6 pr-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
          <h5 class="mb-2 text-xl font-medium leading-tight">Card title</h5>
          <p class="mb-4 text-base">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <div class="block rounded-lg  py-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
          <h5 class="mb-2 text-xl font-medium leading-tight">Card title</h5>
          <p class="mb-4 text-base">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>{" "}
      </div>
    </div>
  );
}
