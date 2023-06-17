<script lang="ts" setup>
// eslint-disable-next-line import/order
import type { VueFilePondComponent } from 'vue-filepond'
import vueFilePond from 'vue-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginGetFile from 'filepond-plugin-get-file'
import FilePondPluginImageOverlay from 'filepond-plugin-image-overlay'
import FilePondPluginPdfPreview from 'filepond-plugin-pdf-preview'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond-plugin-get-file/dist/filepond-plugin-get-file.min.css'
import 'filepond-plugin-image-overlay/dist/filepond-plugin-image-overlay.css'

import { useGetSignedAttachmentUrlQuery, useUploadAttachmentMutation, useGetSignedAttachmentUrlLazyQuery } from '~/graphql'

const props = withDefaults(defineProps<Props>(), {
  allowMultiple: false,
  required: false,
  fileTypes: 'image/jpeg, image/png',
})

const emit = defineEmits(['newFileAdd', 'loading', 'fileRemove'])

interface Props {
  files?: any[]
  allowMultiple?: boolean
  required?: boolean
  fileTypes?: string
  disabled?: boolean
}
const query = reactive<{id: string | null}>({id: null})

const { mutate: uploadAttachment } = useUploadAttachmentMutation({})
const { onResult: getAttachment } = useGetSignedAttachmentUrlQuery(
  query,
  {
    fetchPolicy: 'network-only',
  },
)

const getSignedUrl = async (id: string): Promise<string> => {
  query.id = id
  return new Promise((resolve, reject) =>
    getAttachment(({ data }) => {
      if (data.getSignedAttachmentUrl)
        resolve(data.getSignedAttachmentUrl)
      reject(Error('cannot find file'))
    }),
  )
}

const server = {
  process: async (
    _fieldName: string,
    file: File,
    _metadata: any,
    load: (arg0: any) => any,
    _error: any,
    progress: any,
    abort: () => any,
  ) => {
    const result = await uploadAttachment(
      {
        file,
      },
      {
        context: {
          fetchOptions: {
            useUpload: true,
            onProgress: (ev: ProgressEvent) => {
              progress(ev.lengthComputable, ev.loaded, ev.total)
            },
          },
        },
      },
    )

    if (result && result.data?.uploadAttachment._id)
      return load(result.data.uploadAttachment._id)

    return abort()
  },
  load: async (source: any, load: any, error: any, progress: any, abort: any, headers: any) => {
    const data = await getSignedUrl(source)
    const myRequest = new Request(data)
    const response = await fetch(myRequest)
    const blob = (await response.blob()) as any
    blob.name = 'Uploaded File'
    load(blob as File)
  },
}

const FilePond = vueFilePond(
  FilePondPluginGetFile,
) as VueFilePondComponent

const onLoad = (el: Element, { serverId }: { serverId: string }) => {
  emit('newFileAdd', serverId)
}

const onClick = ({ serverId }: { serverId: string }) => {
  // console.log(serverId)
}

const onRemove = (el: Element, { serverId }: { serverId: string }) => {
  emit('fileRemove', serverId)
}
</script>

<template>
  <div class="image-upload">
    <FilePond ref="pond" :server="server" class-name="my-pond"
      label-idle="Drag & Drop your file or <span class='filepond--label-action'>Browse</span>"
      :allow-multiple="allowMultiple" :accepted-file-types="props.fileTypes" style-button-remove-item-position="right"
      :allow-image-preview="false" :allow-pdf-preview="false" :files="files" :disabled="disabled"
      :required="props.required" @processfile="onLoad" @activatefile="onClick" @processfilestart="$emit('loading', true)"
      @processfiles="$emit('loading', false)" @removefile="onRemove" />
  </div>
</template>

<style lang="scss">
.image-upload {

  // @import "~/assets/scss/import.scss";
  m [data-filepond-item-state='processing-complete'] {
    @apply shadow-md;
    border-radius: 8px;

    &::before {
      border-radius: 8px;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      mix-blend-mode: multiply;
      transition: box-shadow 0.15s ease;
    }
  }

  .filepond--root {
    font-family: inherit;
  }

  .filepond--root.filepond--hopper {
    cursor: pointer;

    label {
      cursor: pointer;
    }
  }

  .filepond--credits {
    display: none;
  }

  .filepond--drip {
    @apply border-gray-300 border-2 border-dashed;
    opacity: 1;
    background: transparent;
  }

  .filepond--panel-root {
    background: transparent;
  }

  // .filepond--item {
  //   @apply md:w-[calc(50%-0.5em)] w-full xl:w-[calc(33.333%-0.5em)] min-h-[256px];
  // }

  .filepond--panel-top.filepond--item-panel,
  .filepond--panel-center.filepond--item-panel,
  .filepond--panel-bottom.filepond--item-panel {
    @apply bg-slate-700;
  }

  .filepond--image-preview {
    background: transparent;
  }

  span.filepond--download-icon {
    background: white;
    font-size: .5em;
    margin-bottom: 0.5em;
    width: 2em;
    height: 2em;
    float: left;;
  }

  .filepond--file-info {
  }
}
</style>
