const request = require("supertest");
const app = require("../src/app");
const db = require("../src/models/index");
describe("Test all apis /api", () => {
  test("Apis working as expected", async () => {
    // create a user and generate a valid Bearer token
    const userData = {
      email: "john@example.com",
      password: "reunion",
    };
    const response = await request(app)
      .post("/api/authenticate")
      .send(userData);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body.accessToken).toBe("string");

    //test all_posts api

    const allPosts = await request(app)
      .get("/api/all_posts")
      .set("Authorization", `Bearer ${response.body.accessToken}`);
    expect(typeof allPosts.body.length).toBe("number");
    //test user api
    const profile = await request(app)
      .get("/api/user")
      .set("Authorization", `Bearer ${response.body.accessToken}`);
    expect(profile.body.id).toBe(1);
    expect(profile.body.email).toBe(userData.email);

    const like = await request(app)
      .post("/api/like/1")
      .set("Authorization", `Bearer ${response.body.accessToken}`);
    expect(like.body.message).toBe("like success");

    const post = await request(app)
      .get("/api/posts/1")
      .set("Authorization", `Bearer ${response.body.accessToken}`);
    expect(post.body.title).toBe("dolore dolorum blanditiis adipisci");
    expect(post.body.userId).toBe(1);
    expect(post.body.likes).toBe(1);

    const follow = await request(app)
      .post("/api/follow/2")
      .set("Authorization", `Bearer ${response.body.accessToken}`);
    console.log(follow.body);
    expect(follow.body.message).toBe("follow success");
  });
});
