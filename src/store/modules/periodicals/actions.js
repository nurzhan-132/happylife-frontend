export default {
  async loadPeriodicals(context) {
    const response = await fetch(
      "http://localhost:8899/api/test/all-periodicals",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    const periodicals = [];

    for (const key in data) {
      const periodical = {
        publisher: data[key].publisher,
        name: data[key].name,
        description: data[key].description,
        available: data[key].available,
        image: data[key].image,
        type: data[key].type,
        subscribers: data[key].subscribers,
        id: data[key].id,
      };
      periodicals.push(periodical);
    }

    console.log(periodicals);

    context.commit("setPeriodicals", periodicals);
  },
  async subscribe(context, payload) {
    let subscribed = true;

    const response = await fetch("http://localhost:8899/api/test/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        periodicalId: payload.periodicalId,
        username: payload.username,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      subscribed = false;
      const error = new Error(data.message || "Failed to send request.");
      throw error;
    }

    const subscribers = [];

    for (const key in data) {
      const subscriber = {
        publisher: data[key].publisher,
        name: data[key].name,
        description: data[key].description,
        available: data[key].available,
        image: data[key].image,
        type: data[key].type,
        subscribers: data[key].subscribers,
        id: data[key].id,
      };
      subscribers.push(subscriber);
    }

    context.commit("setSubscribers", {
      periodicalId: payload.periodicalId,
      newSubscribers: subscribers,
    });

    //back to periodial details page
    return subscribed;
  },
  async unsubscribe(context, payload) {
    let unsubscribed = true;

    const response = await fetch("http://localhost:8899/api/test/unsubscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        periodicalId: payload.periodicalId,
        username: payload.username,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      unsubscribed = false;
      const error = new Error(data.message || "Failed to send request.");
      throw error;
    }

    const subscribers = [];

    for (const key in data) {
      const subscriber = {
        publisher: data[key].publisher,
        name: data[key].name,
        description: data[key].description,
        available: data[key].available,
        image: data[key].image,
        type: data[key].type,
        subscribers: data[key].subscribers,
        id: data[key].id,
      };
      subscribers.push(subscriber);
    }

    context.commit("setSubscribers", {
      periodicalId: payload.periodicalId,
      newSubscribers: subscribers,
    });

    //back to periodial details page
    return unsubscribed;
  },
  async deletePeriodical(_1, payload) {
    const response = await fetch(
      "http://localhost:8899/api/test/delete-periodical/" + payload,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      const error = new Error("Failed to delete periodical.");
      throw error;
    }
  },
  async updateAvailability(_1, payload) {
    const response = await fetch(
      "http://localhost:8899/api/test/update-availability/" + payload,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      const error = new Error("Failed to update periodical availability.");
      throw error;
    }
  },
  async postPeriodical(_1, payload) {
    // for (var pair of payload.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    const response = await fetch("http://localhost:8899/api/test/post-new", {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      const error = new Error("Failed to post periodical.");
      throw error;
    }
  },
};
