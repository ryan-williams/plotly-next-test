ARG FROM=latest
FROM node:$FROM
RUN git clone https://github.com/ryan-williams/plotly-next-test.git
WORKDIR plotly-next-test
ENV PATH=node_modules/.bin:$PATH NEXT_BASE_PATH=/plotly-next-test
RUN npm install \
 && npm install -g http-server \
 && next build \
 && next export -o out/plotly-next-test
ARG PORT=8080
ENTRYPOINT [ "http-server", "$PORT", "out" ]
