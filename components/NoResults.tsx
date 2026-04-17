import { View, Image, Text } from 'react-native'
import React from 'react'
import { images } from '@/constants'

const NoResults = () => {
  return (
    <View className='justify-center items-center'>
      <Image source={images.NoResults} className='mb-3' />
      <Text className='font-quicksand text-xl font-bold text-[#181C2E] mb-5'>Nothing matched your search.</Text>
      <Text className='text-[#878787] text-lg font-quicksand'>Try a different search term or check for typos.</Text>
    </View>
  )
}

export default NoResults