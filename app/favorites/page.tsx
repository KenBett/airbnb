// @\app\favorites\page.tsx
import EmptyState from "@/components/EmptyState"
import getCurrentUser from "@/actions/getCurrentUser"
import getFavorites from "@/actions/getFavoriteListings"
import getFavoriteListings from "@/actions/getFavoriteListings"
import FavoriteClient from "@/components/favorites/FavoriteClient"
export default async function Page(){
  const listings = await getFavoriteListings()
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return(
      <EmptyState
        title="No favorites found"
        subTitle="Looks like you have no favorite listings"
       />
    )
  }
  return(
    <>
    <FavoriteClient
      listings={listings}
      currentUser={currentUser}
     />
    </>
  )
}