// import { useState, useEffect } from 'react'
// import { database } from '~planner/data/setup'
// import { RxDatabase } from 'rxdb'

// export const useDb = (collection: string) => {
//   const [db, setDb] = useState<RxDatabase | null>(null)

//   useEffect(() => {
//     if (!db) {
//       database.then(setDb)
//     }
//   }, [])

//   return db ? db[collection] : null
// }
