import axios from 'axios';

export const get = async (url) => {
    const response = await axios.post("/api/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          setLoading(false);
          console.log(res);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
}