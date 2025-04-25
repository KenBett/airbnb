// @\app\trips\page.tsx
import EmptyState from "@/components/EmptyState"
import getCurrentUser from "@/actions/getCurrentUser"
import getListings from "@/actions/getListings";
import PropertyClient from "@/components/properties/PropertyClient"
export default async function Page(){
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subTitle="Please Login"
       />
    )
  }

  const listings = await getListings(Promise.resolve({
    userId: currentUser.id
  }))

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subTitle="Looks like you dont have any properties"
       />
    )
  }

  return(
    <div className="pt-10">
    <PropertyClient
      listings={listings}
      currentUser={currentUser}
     />
    </div>
  )
}