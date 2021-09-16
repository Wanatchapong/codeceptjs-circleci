Feature('User APIs');

let userId;

Scenario('Create new user', async ({ I }) => {
  const user = {
    name: 'morpheus',
    job: 'leader',
  };

  const res = await I.sendPostRequest('/users', secret(user));

  I.assertEqual(res.status, 201);
  I.assertEqual(res.data.name, user.name);

  userId = res.data.id;
});

After(async ({ I }) => {
  if (userId) {
    const res = await I.sendDeleteRequest(`/users/${userId}`);

    I.assertEqual(res.status, 204);
  }
});
