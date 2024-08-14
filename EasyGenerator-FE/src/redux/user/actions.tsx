import * as types from "./action-types";
import { auth } from "../../config/firebase";

const signinStart = () => ({
  type: types.LOGIN_START,
});
const signSuccess = (user: any) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});
const signinError = (error: any) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

const setUser = (user: any) => ({
  type: types.SET_USER,
  payload: user,
});

const logoutStart = () => ({
  type: types.LOGOUT_START,
});
const logoutSuccess = (user: any) => ({
  type: types.LOGOUT_SUCCESS,
  payload: user,
});
const logoutError = (error: any) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

// export const loginWithFirebase = (email : string, password: string):any=>{
// return function(dispatch : any){
//     dispatch(signinStart());
//     auth.signInWithEmailAndPassword(email,password).then(async ({user})=>{
//         console.log(user)
//         let user_role =  await user?.getIdTokenResult()
//         const serializableUser = {
//             firebase_uid: user?.uid,
//             role: user_role?.claims.role,
//             data: {
//                 displayName: user?.displayName,
//                 photoURL: user?.photoURL,
//                 email: user?.email,
//                 loginRedirectUrl: null
//             }
//           };
//         dispatch(signSuccess(serializableUser))
//     }).catch((error=>{
//         console.log(error)
//         dispatch(signinError(error))
//     }))

// }
// }

export const placeUser = (user: any): any => {
  return (dispatch: any) => {
    dispatch(setUser(user));
  };
};

export const loginWithFirebase = (email: string, password: string): any => {
  return async (dispatch: any) => {
    dispatch(signinStart());
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const { user } = userCredential;

      if (!user) {
        throw new Error("User not found");
      }

      const idTokenResult = await user.getIdTokenResult();
      const userRole = idTokenResult.claims.role || null;

      const serializableUser = {
        firebase_uid: user.uid,
        role: userRole,
        data: {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          loginRedirectUrl: null,
        },
        fetched: true,
      };

      dispatch(signSuccess(serializableUser)); // Redirect or navigate to another page after successful sign-in
    } catch (error) {
      let serializeError = {
        code: (error as any)?.code || "unknown_error",
        message: (error as any)?.message || "An unknown error occurred",
        name: (error as any)?.name || "FirebaseError",
        customData: (error as any)?.customData || {},
      };
      console.error("Sign-in Error:", error);
      dispatch(signinError(serializeError)); // Ensure error is serializable
    }
  };
};

export const logout = (): any => {
  return async (dispatch: any) => {
    dispatch(logoutStart);
    try {
      await auth.signOut();
      dispatch(logoutSuccess(null));
    } catch (error) {
      let serializeError = {
        code: (error as any)?.code || "unknown_error",
        message: (error as any)?.message || "An unknown error occurred",
        name: (error as any)?.name || "FirebaseError",
        customData: (error as any)?.customData || {},
      };
      dispatch(logoutError(serializeError));
    }
  };
};
