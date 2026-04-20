import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFetch from '@/lib/useFetch'
import { getSingleMenu } from '@/lib/appwrite'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '@/components/CustomHeader'
import { images } from '@/constants'

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <View className="flex-row items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <View
          key={star}
          className={`${star <= Math.round(rating) ? 'text-orange-400' : 'text-gray-200'}`}
        >
          <Image source={images.star} className='size-5' />
        </View>
      ))}
      <Text className="text-[16px] text-gray-500 ml-5">{rating}/5</Text>
    </View>
  )
}

const SingleMenu = () => {
  const { id } = useLocalSearchParams()

  const { data: menu, loading, error } = useFetch({
    fn: () => getSingleMenu(id as string),
  })
  console.log("menu", JSON.stringify(menu, null, 2));
  
  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#fb923c"
        className="h-full flex items-center justify-center"
      />
    )

  if (error) return <Text className="text-red-500">{error}</Text>

  return (
    <SafeAreaView className="flex-1 bg-[#fbfbfb] px-4 my-4">
        <CustomHeader title='' /> 

        <View className='flex flex-row justify-between items-center'>
          <View>
            <Text className='text-2xl font-quicksand-bold text-dark-100 mb-2'>{menu?.name}</Text>
            <Text className='text-[16px] font-quicksand text-[#878787] mb-4'>Chheseburger</Text>

            <StarRating rating={menu?.rating || 0} />
            <Text className='text-lg font-bold mt-2'>$ {menu?.price}</Text>

            <View>
              <View>
                <Text>Calories</Text>
                <Text>{menu?.calories} cal</Text>
              </View>
              <View>
                <Text>Protein</Text>
                <Text>{menu?.protein} g</Text>
              </View>
              <View>

              </View>
            </View>

            <View>
              <Text>Bun Type</Text>
              <Text>Whole Wheat</Text>
            </View>
          </View>


          {/* Image */}
          <View>
            <Image source={{uri: menu?.image_url}}  className='w-[178px] h-[297px]' resizeMode='contain'/>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default SingleMenu