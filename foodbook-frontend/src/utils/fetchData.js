import { getUserData } from "../services/userService";

export async function sendFormData(formData, method, url) {
  const userData = getUserData();

  const requestOptions = {
    method,
    headers: {
      Authorization: `Bearer ${userData.authorization}`,
    },
    body: formData,
  };

  const response = await fetch(url, requestOptions);

  if (response.status === 400) {
    throw new Error(JSON.stringify(await response.json()));
  }
}
