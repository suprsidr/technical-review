import request from 'superagent';
import jsonp from 'superagent-jsonp';
import {FETCH_URL} from './globals';

/**
 * fetch data from the server
 * @param {Object} query
 * @param {object} sort
 * @param {Function} cb
 */
export const fetchData = (
  query = {},
  sort = {
    "name.last":1,
    "name.first":1
  },
  cb) => {
	console.log('getting data from the server');
	const q = JSON.stringify(query),
				s = JSON.stringify(sort),
				f = JSON.stringify({
					_id: 0
				});
	request
			.get(`${FETCH_URL}/${q}/0/${s}/${f}`)
			.use(jsonp)
			.end((err, res) => {
				if (err) {
					cb(err);
				} else {
					const data = res.body.error ? [] : res.body;
					cb(null, data);
				}
			});
};

/**
 * update data on the server
 * @param {Object} query
 * @param {Function} cb
 */
export const updateRemoteData = (
  query = {},
  cb) => {
  console.log('updating data on the server');
  const q = JSON.stringify(query);
  request
    .post(`${FETCH_URL}/update/${q}`)
    .end((err, res) => {
      console.log('error: ' + err, 'body: ' + JSON.stringify(res.body));
      if (err) {
        cb(err);
      } else {
        const data = res.body.result.nModified === 1 ? res.body.student : null;
        cb(null, data);
      }
    });
};

export const upsert = (db, data, cb) => {
	db.students.upsert(data, () => {
		console.log('data upserted');
    cb && cb();
	});
}
