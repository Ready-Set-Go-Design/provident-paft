export const submitForm = async (formData: any) => {
  try {
    const sanitizedForm = { ...formData };
    // Remove any fields that are not needed for submission
    delete sanitizedForm.error;
    const response = await fetch("http://localhost:3002/paft-submission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitizedForm),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting form:", error);
    //@ts-ignore
    return { result: false, error: error.message };
  }
};
