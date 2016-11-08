function a_xyz()
  local x = 'hi there!'
  local i = 0
  return function()
    for i = 1,5 do
      print(x)
    end
    return x
  end
end

function arootytooty()
  print('1!')
  print('2!')
  print('a 1! 2! 3! f-')
  coroutine.yield()
  print('5!')
  coroutine.yield()
  print('6!')
  coroutine.yield()
  print('7!')
  coroutine.yield()
  print('8!')
end

function mrcaller()
  print('mrcaller starts')
  coroutine.hackCreateAndResume(function() arootytooty() end)
  print('mrcaller ends.')
end


local awuz = a_xyz()
print(awuz())

mrcaller()

print('the Zee')
