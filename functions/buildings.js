const buildings = require("../buildings.json");
exports.handler = async (event, context) => {
    try {
      return {
        statusCode: 200,
        body: JSON.stringify(buildings),
        headers: {
          "Content-Type": "application/json",
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch buildings" }),
      };
    }
  };