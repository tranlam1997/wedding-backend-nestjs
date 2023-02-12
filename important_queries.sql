SELECT
    *
FROM
    `Event`
WHERE
    start_time >= 1663779600000
    AND start_time < 1663866000000

    
SELECT
    a.id,
    a.title,
    a.guest_estimate,
    a.start_time,
    a.end_time,
    a.deposit,
    c.name place_name,
    c.id place_id
FROM
    Event a
    LEFT JOIN Place c ON c.id = a.place_id
WHERE
    start_time >= 1663779600000
    AND start_time < 1663866000000