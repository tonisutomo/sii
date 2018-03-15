package rptk.util;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.chemistry.opencmis.client.api.Document;
import org.apache.chemistry.opencmis.client.api.Folder;
import org.apache.chemistry.opencmis.client.api.ItemIterable;
import org.apache.chemistry.opencmis.client.api.QueryResult;
import org.apache.chemistry.opencmis.client.api.QueryStatement;
import org.apache.chemistry.opencmis.client.api.Repository;
import org.apache.chemistry.opencmis.client.api.Session;
import org.apache.chemistry.opencmis.client.api.SessionFactory;
import org.apache.chemistry.opencmis.client.runtime.SessionFactoryImpl;
import org.apache.chemistry.opencmis.commons.PropertyIds;
import org.apache.chemistry.opencmis.commons.SessionParameter;
import org.apache.chemistry.opencmis.commons.data.ContentStream;
import org.apache.chemistry.opencmis.commons.enums.BindingType;
import org.apache.chemistry.opencmis.commons.enums.VersioningState;
import org.apache.chemistry.opencmis.commons.exceptions.CmisConnectionException;
import org.apache.chemistry.opencmis.commons.exceptions.CmisRuntimeException;
import org.apache.chemistry.opencmis.commons.impl.dataobjects.ContentStreamImpl;

/**
 * @author ferdian
 * 
 */
public class FileUploadUtil {

	public static String uploadDocument(Map<String,String> alfrescoParams, byte[] file,String filename,String ext,String mimetype,String folderpath) {
		BufferedReader br = null;
		 
		String generalPath=alfrescoParams.get("folder");
		String urlAlfresco=alfrescoParams.get("url");
		
		// Default factory implementation of client runtime.
		SessionFactory sessionFactory = SessionFactoryImpl.newInstance();
		Map<String, String> parameter = new HashMap<String, String>();

		// User credentials.
		parameter.put(SessionParameter.USER, alfrescoParams.get("username"));
		parameter.put(SessionParameter.PASSWORD, alfrescoParams.get("password"));

		// Connection settings.
		parameter.put(SessionParameter.ATOMPUB_URL,urlAlfresco+"/alfresco/service/cmis"); // URL to your CMIS server.
		// parameter.put(SessionParameter.REPOSITORY_ID, "myRepository"); //Only necessary if there is more than one repository.
		parameter.put(SessionParameter.BINDING_TYPE,BindingType.ATOMPUB.value());

		// Create session.
		Session session = null;
		try {
			// This supposes only one repository is available at the URL.
			List<Repository> reps = sessionFactory.getRepositories(parameter);
			Repository soleRepository = sessionFactory.getRepositories(parameter).get(0);
			session = soleRepository.createSession();
		} catch (CmisConnectionException e) {
			// The server is unreachable
			e.printStackTrace();
			return null;
		} catch (CmisRuntimeException e) {
			// The user/password have probably been rejected by the server.
			e.printStackTrace();
			return null;
		}
		
		//System.out.println("session >> " + session.getObjectByPath("/PMIS"));
		
		Folder folder = (Folder) session.getObjectByPath(generalPath);
		
		//cek nama dokumen if existing
		filename=getUniqueFileName(session,folder, generalPath,filename, filename,ext,1)+ext;
		System.out.print("Ext :" + ext +"  dasd " +filename);
		// properties
		// (minimal set: name and object type id)
		Map<String, Object> properties = new HashMap<String, Object>();
		properties.put(PropertyIds.OBJECT_TYPE_ID, "cmis:document");
		properties.put(PropertyIds.NAME, filename);

		// content
		try {
			String mime = mimetype == null || mimetype.equals("null")? "application/octet-stream" : mimetype;
			System.out.println("mime ? " + mime);
			InputStream stream = new ByteArrayInputStream(file);
			ContentStream contentStream = new ContentStreamImpl(filename,BigInteger.valueOf(file.length), mime, stream);
			
                        System.out.println("properties: " + properties.get(PropertyIds.NAME));
                        System.out.println("contentStream: " + contentStream.getFileName());
                        
			// create a major version
			Document newDoc = folder.createDocument(properties, contentStream,null);
			session.clear();
		} catch (Exception e) {
                        System.out.println("masuk error.......");
			e.printStackTrace();
			return null;
		}
		
		return generalPath+folderpath+"/"+filename;
	}
	
	private static String getUniqueFileName(Session session,Folder folder,String path,String original_filename,String filename,String ext,Integer count){
		filename=filename.replaceAll(" ", "_");
		filename=filename.replaceAll("-", "_");
		System.out.println("fielname ? " + filename);
		ItemIterable<QueryResult> results = session.query("SELECT cmis:name FROM cmis:document where cmis:name='"+filename+ext+"'", false);
		if(results.getTotalNumItems()>0){
			String[] fl = original_filename.split("\\.");
			System.out.print(fl[0]);  
			filename = fl[0]+"("+count+")"+"."+fl[1];
			//filename=original_filename+"("+count+")";
			filename=getUniqueFileName(session, folder, path, original_filename,filename,ext,count+1);
		}
		
		return filename;
	}
	
	public static Object[] download(Map<String,String> alfrescoParams, String lokasi_file){
		String generalPath=alfrescoParams.get("folder");
		String urlAlfresco=alfrescoParams.get("url");
		
		// Default factory implementation of client runtime.
		SessionFactory sessionFactory = SessionFactoryImpl.newInstance();
		Map<String, String> parameter = new HashMap<String, String>();

		// User credentials.
		parameter.put(SessionParameter.USER, alfrescoParams.get("username"));
		parameter.put(SessionParameter.PASSWORD, alfrescoParams.get("password"));

		// Connection settings.
		parameter.put(SessionParameter.ATOMPUB_URL,urlAlfresco+"/alfresco/service/cmis"); // URL to your CMIS server.
		// parameter.put(SessionParameter.REPOSITORY_ID, "myRepository"); //Only necessary if there is more than one repository.
		parameter.put(SessionParameter.BINDING_TYPE,BindingType.ATOMPUB.value());

		// Create session.
		Session session = null;
		try {
			// This supposes only one repository is available at the URL.
			Repository soleRepository = sessionFactory.getRepositories(parameter).get(0);
			session = soleRepository.createSession();
		} catch (CmisConnectionException e) {
			// The server is unreachable
		} catch (CmisRuntimeException e) {
			// The user/password have probably been rejected by the server.
		}
		
		Object[] result=new Object[4];
		try {
			Document document = (Document)session.getObjectByPath(lokasi_file);
			
			InputStream stream = document.getContentStream().getStream();		
			String type = document.getContentStream().getMimeType();		
			String filename = document.getName();
			
			result[0]=1;
			result[1]=stream;
			result[2]=type;
			result[3]=filename;
		} catch (Exception e) {
			e.printStackTrace();
			result[0] = 0;
		}
		return result;
	}
	
	public static boolean delete(Map<String,String> alfrescoParams, String lokasi_file){
		String generalPath=alfrescoParams.get("folder");
		String urlAlfresco=alfrescoParams.get("url");
		
		// Default factory implementation of client runtime.
		SessionFactory sessionFactory = SessionFactoryImpl.newInstance();
		Map<String, String> parameter = new HashMap<String, String>();

		// User credentials.
		parameter.put(SessionParameter.USER, alfrescoParams.get("username"));
		parameter.put(SessionParameter.PASSWORD, alfrescoParams.get("password"));

		// Connection settings.
		parameter.put(SessionParameter.ATOMPUB_URL,urlAlfresco+"/alfresco/service/cmis"); // URL to your CMIS server.
		// parameter.put(SessionParameter.REPOSITORY_ID, "myRepository"); //Only necessary if there is more than one repository.
		parameter.put(SessionParameter.BINDING_TYPE,BindingType.ATOMPUB.value());

		// Create session.
		Session session = null;
		try {
			// This supposes only one repository is available at the URL.
			Repository soleRepository = sessionFactory.getRepositories(parameter).get(0);
			session = soleRepository.createSession();
		} catch (CmisConnectionException e) {
			// The server is unreachable
		} catch (CmisRuntimeException e) {
			// The user/password have probably been rejected by the server.
		}
		
		try {
			Document document = (Document)session.getObjectByPath(lokasi_file);
			document.delete(true);
			
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
