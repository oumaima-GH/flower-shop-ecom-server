// const db = require('../prismaDb')
// const { ErrorHandler } = require('../utils/handleError');


// const getCarts = async (userId, cartId) => {
//     try {
//       const card = await db.cart.findMany({
//         where: {
//           userId,
//           id: cartId,
//         },
//         include: {
//           product: true,
//         },
//       });
  
//       return card;
//     } catch (error) {
//       throw new ErrorHandler(500, error.message);
//     }
//   };
// // const getCartById = async (id) => {
// //     try {
// //         const cart = await db.cart.findUnique({
// //             where: { id: parseInt(id) }
            
// //         });
// //         return cart;
// //     } catch (err) {
// //         throw new ErrorHandler(500, err.message);
// //     }
// // }

// const postCart = async ({ userId, productId, quantity }) => {
//     try {

//         if (!productId || quantity) {
//             throw new ErrorHandler(400, 'Please provide all required fields');
//         }

//         const cart = await db.cart.create({
//             data: { 
//                 userId, 
//                 productId, 
//                 quantity: parsedQuantity 
//             },
//             include: {
//                 product: true,
//             },
//         });
//         return cart;
//     } catch (err) {
//         console.log("Error in postCart:", err.message);
//         throw new ErrorHandler(500, err.message);
//     }
// };


// module.exports = { getCarts, postCart };